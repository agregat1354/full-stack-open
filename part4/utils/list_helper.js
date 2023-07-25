const dummy = blogs => {
    return 1
}

const totalLikes = blogs => blogs.length > 0 ? blogs.reduce((sum, currElem) => sum += currElem.likes, 0) : 0

module.exports = {
    dummy,
    totalLikes
}