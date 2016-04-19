var persons = [
  'Lola', ' Lilly', ' Lulu'
];


function whoRocks(name) {
  return name + 'rocks';
};

function myFunction() {
  document.getElementById('demo').innerHTML = persons.map(whoRocks);
};
