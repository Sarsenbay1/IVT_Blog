import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from '../axios';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

export const FullPost = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const { id } = useParams();

    React.useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.warn(err);
                alert('Ошибка при получении статьи');
            });
    }, []);

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost />;
    }

    return (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={
                    data.imageUrl
                        ? `${process.env.REACT_APP_API_URL}${data.imageUrl}`
                        : ''
                }
                // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                user={data.user}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentsCount={3}
                tags={data.tags}
                isFullPost
            >
                <ReactMarkdown children={data.text} />
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: 'Мимур Тингазов',
                            avatarUrl:
                                'https://mui.com/static/images/avatar/1.jpg',
                        },
                        text: 'Круто писать код на COBOL',
                    },
                    {
                        user: {
                            fullName: 'Максимус Флор',
                            avatarUrl:
                                'https://mui.com/static/images/avatar/2.jpg',
                        },
                        text: 'Король Фронтенда',
                    },
                ]}
                isLoading={false}
            >
                <Index />
            </CommentsBlock>
        </>
    );
};
