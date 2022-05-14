import React, { useEffect } from 'react';
import { Container } from '@chakra-ui/react';

const Page = ({ children }) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    const styleProps = {
        main: {
            minH: "100vh",
            maxW: { base: "100%", md: "container.sm", lg: "container.md" },
            pt: "5vh"
        }
    }

    return (
        <Container {...styleProps.main} >
            {
                children
            }
        </Container>
    );
}

export default Page;
