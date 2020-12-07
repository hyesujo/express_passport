module.exports = {
    isOwner:function(request, response) {
        if (request.user) {
            return true;
        } else {
            return false;
        }
    },
    statusUI:function(request, response) {
        var authStatusUI = `
        <style>
        a {
            color:hotpink;
            text-decoration:none;
        }
        </style>
        <a href="/auth/login">Login</a> | 
        <a href="/auth/register">Register</a> |
        <a href="/auth/google">Login with Google</a> |
        <a href="/auth/facebook">Login with facebook</a>
        `
        if (this.isOwner(request, response)) {
            authStatusUI = `${request.user.displayName} | <a href="/auth/logout">Logout</a>`;
        }
        return authStatusUI;
    }
}