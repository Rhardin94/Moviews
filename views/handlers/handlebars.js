module.exports = {
    select: function (selected, option) {
        return (selected == option) ? 'selected="selected"' : '';
    }
};