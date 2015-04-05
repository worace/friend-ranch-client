import DS from 'ember-data';

let Day = DS.Model.extend({
  date: DS.attr("string"),
  events: DS.attr("string")
});

Day.reopenClass({
  FIXTURES: [
     { "id": 1, "date": 'Jul 26', "events": "events" },
     { "id": 2, "date": 'Jul 27', "events": "events" }
  ]
});

export default Day;
