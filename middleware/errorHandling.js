const { UniqueConstraintError } = require("sequelize");

const errorHandling = (err, req, res, next) => {
    console.log(err)
    if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
    } else if (err instanceof UniqueConstraintError) {
        
        return res.status(400).json({ message: 'Duplicate value error' });
    } else {
        // Handle other errors
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = errorHandling;
