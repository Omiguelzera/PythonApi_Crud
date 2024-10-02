// Função para adicionar um contato
document.getElementById('addContactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    fetch('http://127.0.0.1:5000/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('addContactForm').reset();
    })
    .catch(error => console.error('Error adding contact:', error));
});

// Função para listar contatos
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('contactsList')) {
        fetch('http://127.0.0.1:5000/contacts')
            .then(response => response.json())
            .then(data => {
                const contactsList = document.getElementById('contactsList');
                if (data.contacts && data.contacts.length) {
                    data.contacts.forEach(contact => {
                        contactsList.innerHTML += `<p>${contact.name} - ${contact.phone} - ${contact.email}</p>`;
                    });
                } else {
                    contactsList.innerHTML = '<p>Nenhum contato encontrado.</p>';
                }
            })
            .catch(error => console.error('Error fetching contacts:', error));
    }
});

// Função para buscar contato
document.getElementById('searchContactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('searchName').value;
    fetch(`http://127.0.0.1:5000/contact/${name}`)
        .then(response => response.json())
        .then(data => {
            const searchResult = document.getElementById('searchResult');
            if (data.contact) {
                searchResult.innerHTML = `<p>${data.contact.name} - ${data.contact.phone} - ${data.contact.email}</p>`;
            } else {
                searchResult.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => console.error('Error fetching contact:', error));
});

// Função para atualizar contato
document.getElementById('updateContactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('updateName').value;
    const newPhone = document.getElementById('newPhone').value;
    const newEmail = document.getElementById('newEmail').value;

    fetch(`http://127.0.0.1:5000/update/${name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone: newPhone,
            email: newEmail
        }),
    })
    .then(response => response.json())
    .then(data => {
        const updateResult = document.getElementById('updateResult');
        updateResult.innerHTML = `<p>${data.message}</p>`;
    })
    .catch(error => console.error('Error updating contact:', error));
});

// Função para deletar contato
document.getElementById('deleteContactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('deleteName').value;

    fetch(`http://127.0.0.1:5000/delete/${name}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        const deleteResult = document.getElementById('deleteResult');
        deleteResult.innerHTML = `<p>${data.message}</p>`;
    })
    .catch(error => console.error('Error deleting contact:', error));
});



