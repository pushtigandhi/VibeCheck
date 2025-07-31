import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';
import { COLORS, textSIZES } from '../constants';
import { Ionicons } from "@expo/vector-icons";
import { GETtags } from '../API';

const TagsInput = ({ placeholder = "Add tags", icon, setFn, current = [] }) => {
  const [tags, setTags] = useState(current);
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch all available tags from API
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await GETtags();
        setAllTags(tagsData);
      } catch (error) {
        console.log('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  // Update parent component when tags change
  useEffect(() => {
    setFn(tags);
  }, [tags, setFn]);

  // Filter suggestions based on input text
  useEffect(() => {
    if (inputText.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = allTags
      .filter(tag => 
        tag.name && 
        tag.name.toLowerCase().includes(inputText.toLowerCase()) &&
        !tags.some(existingTag => existingTag === tag.name)
      )
      .slice(0, 3); // Limit to 3 suggestions

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [inputText, allTags, tags]);

  const addTag = (tagName) => {
    const trimmedTag = tagName.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      setInputText('');
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
  };

  const handleInputSubmit = () => {
    if (inputText.trim()) {
      addTag(inputText);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    addTag(suggestion.name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleInputSubmit}
          returnKeyType="done"
        />
      </View>

      {/* Display current tags */}
      {tags.length > 0 && (
        <View style={styles.tagsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tags.map((tag, index) => (
              <View key={index} style={styles.tagItem}>
                <Text style={styles.tagText}>#{tag}</Text>
                <TouchableOpacity
                  onPress={() => removeTag(tag)}
                  style={styles.removeTagButton}
                >
                  <Ionicons name="close-circle" size={16} color={COLORS({opacity:1}).primary} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Suggestions */}
      {showSuggestions && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <Text style={styles.suggestionText}>#{suggestion.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default TagsInput;

const styles = StyleSheet.create({
  container: {
    padding: textSIZES.xSmall,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderRadius: textSIZES.xSmall,
    padding: textSIZES.xSmall,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconContainer: {
    marginRight: textSIZES.xSmall,
  },
  textInput: {
    flex: 1,
    fontSize: textSIZES.small,
    color: COLORS({opacity:1}).primary,
  },
  tagsContainer: {
    marginTop: textSIZES.xSmall,
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderWidth: 0.5,
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: textSIZES.xxSmall,
    marginVertical: textSIZES.xxSmall,
    marginRight: textSIZES.xSmall,
    paddingHorizontal: textSIZES.xSmall,
    paddingVertical: textSIZES.xxSmall,
  },
  tagText: {
    fontSize: textSIZES.small,
    color: COLORS({opacity:1}).primary,
    marginRight: textSIZES.xxSmall,
  },
  removeTagButton: {
    marginLeft: textSIZES.xxSmall,
  },
  suggestionsContainer: {
    backgroundColor: COLORS({opacity:1}).white,
    borderRadius: textSIZES.xSmall,
    borderWidth: 1,
    borderColor: COLORS({opacity:0.3}).primary,
    marginTop: textSIZES.xxSmall,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  suggestionItem: {
    padding: textSIZES.xSmall,
    borderBottomWidth: 1,
    borderBottomColor: COLORS({opacity:0.1}).primary,
  },
  suggestionText: {
    fontSize: textSIZES.small,
    color: COLORS({opacity:1}).primary,
  },
}); 