import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Select, Spinner, VStack, Alert, AlertIcon, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import axios from 'axios';

import { fetchRottenTomatoesRatings, fetchImdbRatings, fetchOmdbRatings, fetchTmdbRatings } from '../utils/ratings';

const MostWatchedContent = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ type: 'all', genre: 'all' });
  const [sorting, setSorting] = useState('views');
  const [genres, setGenres] = useState(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [error, setError] = useState(null);
  const [trendingContent, setTrendingContent] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [viewingHabits, setViewingHabits] = useState([]);

  const fetchWeeklySummary = async () => {
    try {
      const response = await axios.get('https://api.example.com/weekly-summary');
      setWeeklySummary(response.data);
    } catch (error) {
      console.error('Error fetching weekly summary:', error);
      setError('Failed to fetch weekly summary. Please try again later.');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [rottenTomatoesData, imdbData, omdbData, tmdbData] = await Promise.all([
        fetchRottenTomatoesRatings('most watched', filters, sorting),
        fetchImdbRatings('most watched', filters, sorting),
        fetchOmdbRatings('most watched', filters, sorting),
        fetchTmdbRatings('most watched', filters, sorting)
      ]);

      const combinedData = [...rottenTomatoesData, ...imdbData, ...omdbData, ...tmdbData];
      setContent(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingContent = async () => {
    try {
      const response = await axios.get('https://api.example.com/trending-content');
      setTrendingContent(response.data);
    } catch (error) {
      console.error('Error fetching trending content:', error);
      setError('Failed to fetch trending content. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
    fetchWeeklySummary();
    fetchTrendingContent();
  }, [filters, sorting]);

  useEffect(() => {
    if (content.length > 0) {
      content.forEach((item) => {
        trackViewingHabit(item.id);
      });
    }
  }, [content]);

  const handleRating = (id, rating) => {
    setUserRatings((prevRatings) => ({
      ...prevRatings,
      [id]: rating,
    }));
  };

  const Rating = ({ id }) => {
    const [rating, setRating] = useState(userRatings[id] || 0);

    const handleChange = (e) => {
      const newRating = parseInt(e.target.value, 10);
      setRating(newRating);
      handleRating(id, newRating);
    };

    return (
      <Box>
        <FormLabel>Rate this content:</FormLabel>
        <Select value={rating} onChange={handleChange}>
          <option value={0}>No Rating</option>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </Select>
      </Box>
    );
  };

  const handleRecommendation = (recommendation) => {
    setUserRecommendations((prevRecommendations) => [
      ...prevRecommendations,
      recommendation,
    ]);
  };

  const RecommendationForm = () => {
    const [recommendation, setRecommendation] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      handleRecommendation(recommendation);
      setRecommendation('');
    };

    return (
      <Box as="form" onSubmit={handleSubmit} mt={4}>
        <FormControl>
          <FormLabel>Recommend a content:</FormLabel>
          <Input
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            placeholder="Enter content title"
          />
        </FormControl>
        <Button type="submit" mt={2}>Submit</Button>
      </Box>
    );
  };

  const trackViewingHabit = (contentId) => {
    setViewingHabits((prevHabits) => [...prevHabits, contentId]);
  };

  const TrendingContent = ({ content }) => (
    <Box mt={8} p={4} borderWidth="1px" borderRadius="lg">
      <Heading size="lg">Trending Content</Heading>
      {content.length > 0 ? (
        content.map((item, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
            <Heading size="md">{item.title}</Heading>
            <Text>{item.description}</Text>
          </Box>
        ))
      ) : (
        <Text>No trending content available</Text>
      )}
    </Box>
  );

  return (
    <Box p={4}>
      <Heading mb={4}>Most Watched Content</Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Filter by Type:</FormLabel>
          <Select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value="all">All</option>
            <option value="movies">Movies</option>
            <option value="shows">TV Shows</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Filter by Genre:</FormLabel>
          <Select value={filters.genre} onChange={(e) => setFilters({ ...filters, genre: e.target.value })}>
            <option value="all">All</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Sort by:</FormLabel>
          <Select value={sorting} onChange={(e) => setSorting(e.target.value)}>
            <option value="views">Most Views</option>
            <option value="rating">Highest Rating</option>
            <option value="date">Newest</option>
          </Select>
        </FormControl>
      </VStack>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Box mt={4}>
          {content.length > 0 ? (
            content.map((item, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
                <Heading size="md">{item.title}</Heading>
                <Text>{item.description}</Text>
                <Rating id={item.id} />
              </Box>
            ))
          ) : (
            <Text>No content available</Text>
          )}
        </Box>
      )}
      {weeklySummary && (
        <Box mt={8} p={4} borderWidth="1px" borderRadius="lg">
          <Heading size="lg">Weekly Summary</Heading>
          <Text>{weeklySummary}</Text>
        </Box>
      )}
      {trendingContent && <TrendingContent content={trendingContent} />}
      <RecommendationForm />
      <Box mt={8} p={4} borderWidth="1px" borderRadius="lg">
        <Heading size="lg">User Recommendations</Heading>
        {userRecommendations.length > 0 ? (
          userRecommendations.map((rec, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
              <Text>{rec}</Text>
            </Box>
          ))
        ) : (
          <Text>No recommendations available</Text>
        )}
      </Box>
    </Box>
  );
};

export default MostWatchedContent;