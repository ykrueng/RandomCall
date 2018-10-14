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
      inputView.init();
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
    },

    showTeamForm() {
      inputView.teamForm.style.display = 'flex';
      inputView.nameInput.focus();
      buttonView.teamButton.style.display = 'none';
    },

    addNewTeam() {
      buttonView.teamButton.style.display = 'block';
      inputView.teamForm.style.display = 'none';

      //update student list
      if (inputView.nameInput.value) {
        model.studentsList = inputView.nameInput.value.split(',').map(s => s.trim());
        inputView.nameInput.value = '';
        this.clearList();
        this.updateRandomView();
        orderedView.render();
      } else {
        alert('Cannot create an empty team');
      }
    }
  }

  const orderedView = {
    init: function() {
      this.orderedListView = document.getElementById("student-list");
      this.render();
    },

    render: function() {
      const students = controller.getStudentList().filter(e => e);
      console.log(students);

      // empty the randomListView from previous list
      while(this.orderedListView.hasChildNodes()) {
        this.orderedListView.removeChild(this.orderedListView.lastChild);
      }

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
      this.render();
    },

    render: function() {
      const students = controller.getRandomStudentList().filter(e => e);

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
      this.randomizeButton.addEventListener('click', function() {
        controller.randomizeList();
        controller.updateRandomView();
      });


      this.clearButton = document.getElementById("clear-button");
      this.clearButton.addEventListener('click', function() {
        controller.clearList();
        controller.updateRandomView();
      });

      this.teamButton = document.getElementById('team-button');
      this.teamButton.addEventListener('click', function() {
        controller.showTeamForm();
      });

    },
  }

  const inputView = {
    init: function() {
      this.teamForm = document.getElementById('team-input');
      this.teamForm.style.display = 'none';
      this.nameInput = document.getElementById('team-names');
      this.createButton = document.getElementById('create-button');
      this.createButton.addEventListener('click', function() {
        controller.addNewTeam();
      })
    },
  }

  controller.init();


}());