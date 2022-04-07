from django.contrib.auth import authenticate, logout, login

# DEPRECATED

def login(request):
    username = request.data['username']
    password = request.data['password']

    return True

def logout():
    pass