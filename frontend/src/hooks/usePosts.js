import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(e => {
        if (sort) {
            return [...posts].sort((p1, p2) => p1[sort].localeCompare(p2[sort]))
        }
        return posts
    }, [sort, posts])

    return sortedPosts
}


export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort)
    const sortedAndSearchedPosts = useMemo(e => {
        return sortedPosts.filter(post =>
            post.title.toLowerCase().includes(query.toLowerCase()))


    }, [query, sortedPosts])
    return sortedAndSearchedPosts
}