const clearbit = require('clearbit')('sk_c3864034993f19bfe6678657db97d71f');

var Person = clearbit.Person;
Person.find({email: 'krebs.bruno@gmail.com'})
  .then(function (person) {
    console.log(JSON.stringify(person));
  })
  .catch(Person.QueuedError, function (err) {
    console.log(err); // Person is queued
  })
  .catch(Person.NotFoundError, function (err) {
    console.log(err); // Person could not be found
  })
  .catch(function (err) {
    console.log('Bad/invalid request, unauthorized, Clearbit error, or failed request');
  });
