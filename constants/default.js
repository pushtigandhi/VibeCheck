const ItemType = {
    Item: 'Item',
    Task: 'Task',
    Event: 'Event',
    Page: 'Page',
    Recipe: 'Recipe',
};

const defaultItem = {
    "category": "Backlog",
    "section": "All",
    "icon": '\u{1F4E6}',
  //  "favicon": 'U+1F4CB',//if favicon === icon then <View style={[styles.border, {padding: 20}}><Text style={{fontisize: 100}}>{favicon}</Text>
    //"tags": [string];
    "description": "",
    "priority": "",
    "itemType" : ItemType.Item,
}

const defaultTask = {
    "category": "Backlog",
    "section": "All",
    "icon": '\u{1F4CB}',
  //  "favicon": 'U+1F4CB',//if favicon === icon then <View style={[styles.border, {padding: 20}}><Text style={{fontisize: 100}}>{favicon}</Text>
    "subtasks": [],
    "itemType" : ItemType.Task,
}
const defaultEvent = {
    "category": "Backlog",
    "section": "All",
    "icon": '\u{1F4CD}',
    "contacts": [],
    "subtasks": [],
  //  "favicon": 'U+1F4CB',//if favicon === icon then <View style={[styles.border, {padding: 20}}><Text style={{fontisize: 100}}>{favicon}</Text>
    "itemType" : ItemType.Event,
}
const defaultPage = {
    "category": "Backlog",
    "section": "All",
    "icon": '\u{1F4C4}',
  //  "favicon": 'U+1F4CB',//if favicon === icon then <View style={[styles.border, {padding: 20}}><Text style={{fontisize: 100}}>{favicon}</Text>
    "itemType" : ItemType.Page,
}
const defaultRecipe = {
    "category": "Cooking",
    "section": "Recipes",
    "icon": '\u{1F37D}',
    "ingredients": [],
    "instructions": [],
  //  "favicon": 'U+1F4CB',//if favicon === icon then <View style={[styles.border, {padding: 20}}><Text style={{fontisize: 100}}>{favicon}</Text>
    "itemType" : ItemType.Recipe,
}
 
export { ItemType, defaultItem, defaultTask, defaultEvent, defaultPage, defaultRecipe };