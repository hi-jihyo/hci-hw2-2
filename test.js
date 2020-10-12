/**
 * test code for homework 2-2.
 */
// creates a tree and sets a root as a window "My Desktop"
let my_tree = Tree.create_tree();
let my_root = my_tree.create_window("window-1", 10, 10, 800, 460, "My Desktop");
my_tree.set_root(my_root);

// creates and add a window "About Lorem Ipsum" and ...
let my_node = my_tree.create_window("window-2", 20, 40, 400, 420, "About Lorem Ipsum");
my_tree.set_background_color(my_node, "#fffaeb");
my_tree.add_node(my_root, my_node);

// add a label in the above window
my_node = my_tree.create_label("label-1", 30, 70, 380, 380, "Lorem Ipsum is simply dummy text of the printing...");
my_tree.set_background_color(my_node, "#fffaeb");
my_tree.add_node(my_tree.search_node("window-2"), my_node);

// creates and add a window "To Do List" and ...
my_node = my_tree.create_window("window-3", 460, 40, 300, 350, "To Do List");
my_tree.set_background_color(my_node, "#dbfdff");
my_tree.add_node(my_root, my_node);

// add a list (consists of a textbox, checkboxes and labels) in the above window
my_node = my_tree.create_textbox("textbox-1", 470, 70, 280, 40, "What I have to do today");
my_tree.set_font_color(my_node, "green");
my_tree.add_node(my_tree.search_node("window-3"), my_node);

my_node = my_tree.create_checkbox("checkbox-1", 470, 120, 30, 30, 15); // the 6th parameter is optional and it is for rendering a rounded rectangle
my_node.isChecked = true;
my_tree.add_node(my_tree.search_node("textbox-1"), my_node);

my_node = my_tree.create_label("label-2", 520, 120, 230, 30, "HCI HW2-2");
my_tree.add_node(my_tree.search_node("textbox-1"), my_node);

my_node = my_tree.create_checkbox("checkbox-2", 470, 170, 30, 30, 15);
my_node.isChecked = false;
my_tree.add_node(my_tree.search_node("textbox-1"), my_node);

my_node = my_tree.create_label("label-3", 520, 170, 230, 30, "Exercise");
my_tree.add_node(my_tree.search_node("textbox-1"), my_node);

TreeParser.render_tree(my_tree);