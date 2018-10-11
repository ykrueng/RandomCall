console.log('JS is running');

(function() {
  const model = {
    studentsList: ['Addison', 'Ben', 'Daren', 'Gina', 'Jason', 'Kevin', 'Nick', 'Yasirah'],
    randomStudentLists: [],
  }

  const controller = {
    init: function() {
      orderedView.init();
      randomView.init();
      buttonView.init();
    },

    getStudentList: function() {
      return model.studentsList;
    },

    getRandomStudentList: function() {
      return model.randomStudentLists;
    },

    randomizeList: function() {
      model.randomStudentLists = [];

      let list = [...model.studentsList];
      let randomNumber;

      for (let i=list.length; i>0; i--) {
        randomNumber = Math.floor(Math.random() * Math.floor(i));
        model.randomStudentLists.push(list[randomNumber]);
        let temp = list[i-1];
        list[i-1] = list[randomNumber];
        list[randomNumber] = temp;
      }
    },

    clearList: function() {
      model.randomStudentLists = [];
    },

    updateRandomView: function() {
      randomView.render();
    }
  }

  const orderedView = {
    init: function() {
      this.orderedListView = document.getElementById("student-list");
      this.render();
    },

    render: function() {
      const students = controller.getStudentList();
      for (let i=0; i<students.length; i++) {
        let studentDiv = document.createElement('div');
        studentDiv.textContent = students[i];
        this.orderedListView.append(studentDiv);
      }
    }
  }

  const randomView = {
    init: function() {
      this.randomListView = document.getElementById("random-student-list");
      // controller.randomizeList();
      this.render();
    },

    render: function() {
      const students = controller.getRandomStudentList();

      // empty the randomListView from previous list
      while(this.randomListView.hasChildNodes()) {
        this.randomListView.removeChild(this.randomListView.lastChild);
      }

      // create new randomListView
      for (let i=0; i<students.length; i++) {
        let studentDiv = document.createElement('div');
        studentDiv.textContent = students[i];
        this.randomListView.append(studentDiv);
      }
    }
  }

  const buttonView = {
    init: function() {
      this.randomizeButton = document.getElementById("randomize-button");
      this.clearButton = document.getElementById("clear-button");
      this.render();
    },

    render: function() {
      this.randomizeButton.addEventListener('click', function() {
        controller.randomizeList();
        controller.updateRandomView();
      });

      this.clearButton.addEventListener('click', function() {
        controller.clearList();
        controller.updateRandomView();
      })
    }
  }

  controller.init();


}());