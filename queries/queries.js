module.exports = {
    getAllcontactDetails,
    getContactBy
};

function getAllcontactDetails(){
    return 'select * from contact_informations';
};

function getContactBy(){
    return 'select * from contact_informations where phone_number = ?';
}