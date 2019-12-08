'use strict';

const authService = require('../../services/authService');

function adminOnly(req, res, next) {
    if (req && req.user && req.user.sub) {
        authService.isValidAdmin(req.user.sub).then((isAdmin) => {
            if (isAdmin) {
                return next();
            }
            else {
                return res.status(403).json({message: "Forbidden"});
            }
        });
    }
    else {
        return res.status(403).json({message: "Forbidden"});
    }
}

module.exports = adminOnly;
