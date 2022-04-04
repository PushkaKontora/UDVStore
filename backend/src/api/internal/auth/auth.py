from django.contrib.auth import authenticate, logout, login

def login(request):
    username = request.data['username']
    password = request.data['password']
    creds = authenticate(username=username,
                         password=password)
    login(request, creds)
    return True

def logout():
    pass