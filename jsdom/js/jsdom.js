function  process() {
    let p = document.createElement('p');
    let pText = document.createTextNode('Hey dude, here\'s is a cool list of colours');

    p.appendChild(pText);

    let ul = document.createElement('ul');
    let l1 = document.createElement('li');
    let l1Text = document.createTextNode('Black');
    l1.appendChild(l1Text);
    ul.appendChild(l1);
    let l2 = document.createElement('li');
    let l2Text = document.createTextNode('Orange');
    l2.appendChild(l2Text);
    ul.appendChild(l2);

    let l3 =document.createElement('li');
    let l3Text = document.createTextNode('Pink');
    l3.appendChild(l3Text);
    ul.appendChild(l3);

    let myDiv = document.getElementById('myDivElement');
    myDiv.appendChild(p);
    myDiv.appendChild(ul);
}