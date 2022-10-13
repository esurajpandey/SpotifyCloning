const {allPodcasts} = require('./allPodcast');
const {followPodcast} = require('./follow');
const {getEpisode} = require('./getEpisode');
const {getPodcast} = require('./getPodcast');
const {unfollowPodcast} = require('./unfollow');

const podcast =  {};

podcast.allPodcasts = allPodcasts;
podcast.followPodcast = followPodcast;
podcast.getEpisode = getEpisode;
podcast.getPodcast = getPodcast;
podcast.unfollowPodcast = unfollowPodcast;

module.exports = podcast;
