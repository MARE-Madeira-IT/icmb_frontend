import React, { useState } from 'react'
import { Container, Content } from '../helper'
import styled from 'styled-components';
import Header from '../common/Header'


const FilterContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: start;
    gap: 20px;
    border-bottom: 1px solid #E1E1E1;
    padding: 10px 20px;
    box-sizing: border-box;

    p {
        margin: 0px;
        cursor: pointer;
    }

    .active {
        color: ${({ theme }) => theme.primary};
        position: relative;
    }

    .active:before {
        content: "";
        width: calc(100% + 10px);
        height: 1px;
        background-color: ${({ theme }) => theme.primary};;
        bottom: -10px;
        left: -5px;
        position: absolute;
    }

`;


function AlertBoard() {
    const [filters, setFilters] = useState(["All", "Connections", "System", "Reminder"]);
    const [currentFilter, setCurrentFilter] = useState(0)

    return (
        <Container>
            <Header hasback hasprofile background="/images/default_header.jpg" />


            <FilterContainer>
                {filters.map((filter, index) => (
                    <p onClick={() => setCurrentFilter(index)} className={currentFilter == index && "active"}>{filter}</p>
                ))}
            </FilterContainer>
            <Content>
            </Content>
        </Container>
    )
}

export default AlertBoard