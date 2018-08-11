
c = console;

mop.helpers(window, ['a', 'b', 'button', 'br', 'div', 'li', 'input', 'h1', 'table', 'td', 'th', 'tr', 'ul', 'section', 'span']);


class TodoList extends mop.Box {
  /*constructor(todos) {
    super()
    this.todos = todos
  }
  push(todos) {
    this.todos = todos
    this._dirty = true
  }
  */
  render() {
    var items = this._data.map(function(todo) {
      return mop.box(TodoItem, todo);
    });
    return div({}, ul({}, items));
  }
}
//TodoList.singleton = true

class TodoItem extends mop.Box {
  /*constructor(todo) {
    super()
    this.todo = todo
  }
  push(todo) {
    this.todo = todo
    this._dirty = true
  }*/
  render() {
    return li({}, this._data.text);
  }
}
//TodoItem.trackBy = 'id';


class Page extends mop.Box {
  constructor(page) {
    super();
    this.route = page.route;
    this.name = page.name;
  }
  render() {
    let atts = app.currentPage == this.route? Page.attsVisible : Page.attsHidden;
    return div(atts, this.name);
  }
}
Page.trackBy = 'route';
Page.attsHidden = {style: 'display: none;'};
Page.attsVisible = {style: 'display: block;'};


class HomePage extends Page {
  constructor(page) {
    super(page)
    let _this = this;
    this.text = '';
    this.todos = [
      {id:1, text:'wash car'},
      {id:2, text:'book flights'},
      {id:3, text:'call Dave'},
      {id:4, text:'Buy crickets'},
    ]
    app.action('saveTodo', function() {
      let text = document.getElementById('add-todo-txt').value
      _this.todos.push({id: _this.todos.length + 1, text: text});
    })
  }
  renderAddBtn() {
    return button({onClick: "app.saveTodo()"}, 'add')
  }
  render() {
    let atts = app.currentPage == this.route? Page.attsVisible : Page.attsHidden;
    return div(atts, [
      h1({}, this.name),
      input({id:'add-todo-txt'}, this.text),
      this.renderAddBtn(),
      mop.box(TodoList, this.todos)
    ]);
  }
}
HomePage.trackBy = 'route';


class PageContainer extends mop.Box {
  render() {
    var pages = app.pages.map(function(page) {
      return mop.box(page.cls, page);
    });
    return div({}, pages);
  }
}
PageContainer.singleton = true;

class MenuEntry extends mop.Box {
  constructor(page) {
    super()
    this.route = page.route;
    this.name = page.name;
  }
  render() {
    return a({href:"#", onclick:"app.showSection('"+ this.route +"')"}, this.name);
  }
}
MenuEntry.trackBy = 'route';

class Menu extends mop.Box {
  render() {
    var menuEntries = app.pages.map(function(page) {
      return mop.box(MenuEntry, page);
    });
    let width = app.menuOpen? "70%" : "0%";
    return div(
      {id:"menu", class:"overlay", style:"width: " + width}, 
      [
        a({href:"#", class:"closebtn", onclick:"app.hideMenu()"}, '&times;'),
        div({class:"overlay-content"}, menuEntries)
      ]
    );
  }
}
Menu.singleton = true;

app = new ViewModel({
  currentPage: 'home',
  pages: [
    {cls: HomePage, route: 'home', name: 'HomePage'},
    //{cls: HomePage, route: 'page2', name: 'Page2'},
    //{cls: HomePage, route: 'page3', name: 'Page3'},
  ]
});

app.action('showMenu', function() {
  this.menuOpen = true;
});

app.action('hideMenu', function() {
  this.menuOpen = false;
});

app.action('showSection', function(section) {
  this.currentPage = section;
  this.menuOpen = false;
});

app.load = function() {
  let _this = this;
  let topLevelBoxes = [
    [PageContainer, 'page-content'],
    [Menu, 'menu'],
  ]
  topLevelBoxes.forEach(function(pair) {
    var box = mop.box(pair[0], _this);
    box.element = document.getElementById(pair[1]);
    _this._watchers.push(box);
  });
  _this.flush();
}



/*
class Page extends mop.Box {
  constructor(active) {
    this.active = active;
  },
  render: function() {
    return div({disabled: !this.active}, this.content());
  }
});

class HomePage', ['Page'], {
  content: function() {
    return 'The home page';
  }
});
*/

/*

*/
