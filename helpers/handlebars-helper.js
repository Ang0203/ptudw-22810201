const helper = {};

helper.createStarList = (stars) => {
    let star = Math.floor(stars);
    let str = '<div class="ratting">' +
        '<i class="fa fa-star"></i>'.repeat(star) +
        (stars > star ? '<i class="fa fa-star-half"></i>' : '') +
        '<i class="fa fa-star-o"></i>'.repeat(5 - Math.ceil(stars)) +
        '</div>';
        
    return str;
};

module.exports = helper;