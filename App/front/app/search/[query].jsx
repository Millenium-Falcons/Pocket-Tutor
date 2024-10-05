import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmptyState, SearchInput, VideoCard } from "../../components";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (query) => {
    // Simulate fetching posts logic
    const fetchedPosts = [
      // Example data
      {
        $id: "1",
        title: "Sample Video",
        thumbnail: "sample-thumbnail.jpg",
        video: "sample-video.mp4",
        creator: {
          username: "creator1",
          avatar: "creator-avatar.jpg",
        },
      },
    ];
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    fetchPosts(query);
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} refetch={() => fetchPosts(query)} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;