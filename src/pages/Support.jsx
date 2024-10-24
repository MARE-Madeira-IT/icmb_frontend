import React from 'react'
import { Container, Content } from '../helper'
import Header from '../common/Header'
import { Collapse } from 'antd';
import styled from 'styled-components';

const FaqContainer = styled.section`
    .ant-collapse {
        background-color: transparent;
    }

    .ant-collapse-header {
        padding-left: 0px !important;
        border-bottom: 1px solid #E1E1E1;
    }

    .ant-collapse-header-text {
        font-size: 16px
    }

    .ant-collapse-content-box {
        padding-top: 0px !important;
        p {
            margin-top: 0px;
        }
        
    }

    .ant-collapse-item-active {
        background-color: ${({ theme }) => theme.secundary};

        .ant-collapse-header {
            border-bottom: 0px;
        }

        .ant-collapse-header-text {
            color: white;
            font-weight: bold;
            padding-left: 16px !important;
        }

        .ant-collapse-content {
            color: white;
            font-size: 16px;
        }
    }
`;

const text = (
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo.
    </p>
);

const items = [
    {
        key: '1',
        label: 'Lorem ipsum dolor sit amet?',
        children: text,
        showArrow: false
    },
    {
        key: '2',
        label: 'This is panel header 2',
        children: text,
        showArrow: false
    },
    {
        key: '3',
        label: 'This is panel header 3',
        children: text,
        showArrow: false
    },
];

function Support() {
    return (
        <Container>
            <Header hasback hasprofile background="/images/default_header.jpg" />

            <Content>
                <h3>Contact us</h3>
                <p>Don't hesitate to contact us wether you have a suggestion on our improvement, a complain to discuss or an issue to solve.</p>


                <h3>Frequently Asked Questions</h3>
                <FaqContainer>
                    <Collapse accordion showArrow={false} items={items} ghost bordered={false} />
                </FaqContainer>
            </Content>
        </Container>
    )
}

export default Support