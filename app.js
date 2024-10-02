document.getElementById('addContactForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    await addContact();
});

document.getElementById('updateContactForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    await updateContact();
});

async function addContact() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const response = await fetch('http://127.0.0.1:5000/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone, email })
    });

    const data = await response.json();
    alert(data.message);
    document.getElementById('addContactForm').reset();
}

async function fetchContacts() {
    const response = await fetch('http://127.0.0.1:5000/contacts');
    const data = await response.json();

    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    if (data.contacts) {
        data.contacts.forEach(contact => {
            contactList.innerHTML += `<p>${contact.name} - ${contact.phone} - ${contact.email}</p>`;
        });
    } else {
        contactList.innerHTML = '<p>Nenhum contato encontrado.</p>';
    }
}

async function fetchContact() {
    const name = document.getElementById('searchName').value;

    const response = await fetch(`http://127.0.0.1:5000/contact/${name}`);
    const data = await response.json();

    const searchResult = document.getElementById('searchResult');
    if (data.contact) {
        searchResult.innerHTML = `<p>${data.contact.name} - ${data.contact.phone} - ${data.contact.email}</p>`;
    } else {
        searchResult.innerHTML = `<p>${data.message}</p>`;
    }
}

async function updateContact() {
    const name = document.getElementById('updateName').value;
    const phone = document.getElementById('updatePhone').value;
    const email = document.getElementById('updateEmail').value;

    const response = await fetch(`http://127.0.0.1:5000/update/${name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone, email })
    });

    const data = await response.json();
    alert(data.message);
    document.getElementById('updateContactForm').reset();
}

async function deleteContact() {
    const name = document.getElementById('deleteName').value;

    const response = await fetch(`http://127.0.0.1:5000/delete/${name}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    alert(data.message);
    document.getElementById('deleteName').value = '';
}


