// Função para adicionar um contato
document.getElementById('addContactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    fetch('http://127.0.0.1:5000/contacts/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email }),
    })
    .then(response => response.json())
    .then(data => {
        // Verifica se houve erro na resposta
        if (data.error) {
            // Exibe a mensagem de erro na tela
            document.getElementById('errorMessage').textContent = data.error;
        } else {
            // Sucesso
            alert(data.message);
            document.getElementById('addContactForm').reset();
            // Limpar a mensagem de erro
            document.getElementById('errorMessage').textContent = '';
        }
    })
    .catch(error => {
        console.error('Error adding contact:', error);
        document.getElementById('errorMessage').textContent = 'Erro ao adicionar contato.';
    });
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
                        contactsList.innerHTML += `<p>${contact.id} - ${contact.name} - ${contact.phone} - ${contact.email}</p>`;
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
    const id = document.getElementById('searchId').value;
    fetch(`http://127.0.0.1:5000/contacts/${id}`)
        .then(response => response.json())
        .then(data => {
            const searchResult = document.getElementById('searchResult');
            if (data.contact) {
                searchResult.innerHTML = `<p>${data.contact.name} - ${data.contact.phone} - ${data.contact.email}</p>`;
            } else {
                // Exibe a mensagem de erro
                searchResult.innerHTML = `<p style="color: red;">${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching contact:', error);
            const searchResult = document.getElementById('searchResult');
            searchResult.innerHTML = `<p style="color: red;">Erro ao buscar contato.</p>`;
        });
});

// Função para preencher automaticamente o formulário quando o ID for inserido
document.getElementById('updateId')?.addEventListener('blur', function() {
    const id = document.getElementById('updateId').value;

    if (id) {
        // Faz a requisição para buscar o contato pelo ID
        fetch(`http://127.0.0.1:5000/contacts/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.contact) {
                    // Preenche os campos do formulário com os dados retornados
                    document.getElementById('updateName').value = data.contact.name;
                    document.getElementById('newPhone').value = data.contact.phone;
                    document.getElementById('newEmail').value = data.contact.email;
                } else {
                    alert('Contato não encontrado');
                    // Limpa os campos caso o ID não seja encontrado
                    document.getElementById('updateName').value = '';
                    document.getElementById('newPhone').value = '';
                    document.getElementById('newEmail').value = '';
                }
            })
            .catch(error => console.error('Erro ao buscar o contato:', error));
    }
});

// Função para atualizar o contato
document.getElementById('updateContactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('updateId').value;
    const newName = document.getElementById('updateName').value;
    const newPhone = document.getElementById('newPhone').value;
    const newEmail = document.getElementById('newEmail').value;

    fetch(`http://127.0.0.1:5000/contacts/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newName,
            phone: newPhone,
            email: newEmail
        }),
    })
    .then(response => response.json())
    .then(data => {
        const updateResult = document.getElementById('updateResult');
        if (data.error) {
            // Exibe a mensagem de erro na tela
            updateResult.innerHTML = `<p style="color: red;">${data.error}</p>`;
        } else {
            // Sucesso
            updateResult.innerHTML = `<p>${data.message}</p>`;
        }
    })
    .catch(error => {
        console.error('Erro ao atualizar contato:', error);
        const updateResult = document.getElementById('updateResult');
        updateResult.innerHTML = `<p style="color: red;">Erro ao atualizar contato.</p>`;
    });
});



// Função para deletar contato
document.getElementById('deleteContactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('deleteId').value;

    fetch(`http://127.0.0.1:5000/contacts/delete/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        const deleteResult = document.getElementById('deleteResult');
        if (data.error) {
            // Exibe a mensagem de erro na tela
            deleteResult.innerHTML = `<p style="color: red;">${data.error}</p>`;
        } else {
            // Sucesso
            deleteResult.innerHTML = `<p>${data.message}</p>`;
        }
    })
    .catch(error => {
        console.error('Error deleting contact:', error);
        const deleteResult = document.getElementById('deleteResult');
        deleteResult.innerHTML = `<p style="color: red;">Erro ao deletar contato.</p>`;
    });
});




