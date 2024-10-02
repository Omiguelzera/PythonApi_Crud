import re
from flask import jsonify

def validate_email(email):
    pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(pattern, email) is not None  # Retorna True ou False

def validate_contact_data(data, contacts):
    errors = []  # Armazena os erros

    # Validação básica
    if 'name' not in data or not data['name']:
        errors.append("Nome é obrigatório.")
    if 'phone' not in data or not data['phone']:
        errors.append("Telefone é obrigatório.")
    if 'email' not in data or not data['email']:
        errors.append("E-mail é obrigatório.")

    # Se houver erros, retorna como resposta JSON
    if errors:
        return jsonify({"error": errors}), 400

    name = data['name']
    phone = data['phone']
    email = data['email']

    # Verificação de comprimento
    if len(name) < 3 or len(name) > 50:
        errors.append("O nome deve ter entre 3 e 50 caracteres.")
    
    if len(phone) < 10 or len(phone) > 15:
        errors.append("O telefone deve ter entre 10 e 15 dígitos.")
    
    if len(email) < 5 or len(email) > 100:
        errors.append("O e-mail deve ter entre 5 e 100 caracteres.")

    # Verificação de caracteres válidos no nome
    if not re.match("^[a-zA-Z\s]*$", name):
        errors.append("O nome deve conter apenas letras e espaços.")

    # Verificação de duplicatas
    if any(contact['email'].lower() == email.lower() for contact in contacts):
        errors.append("Um contato com esse e-mail já existe.")

    # Validação de telefone (apenas números)
    if not re.match("^\d+$", phone):
        errors.append("O telefone deve conter apenas números.")

    # Validação do e-mail
    if not validate_email(email):
        errors.append("E-mail inválido.")

    # Se houver erros, retorna como resposta JSON
    if errors:
        return jsonify({"error": errors}), 400

    return None  # Se não houver erros, retorna None

