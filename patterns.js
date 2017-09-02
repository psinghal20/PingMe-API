var patterns = {
	season:new RegExp(/(s?([0-9]{1,2}))[ex]/,'i'),
	episode:new RegExp(/([ex]([0-9]{2})(?:[^0-9]|$))/,'i'),
	quality:new RegExp(/([0-9]{3,4}p)/,'i')
}

module.exports = patterns