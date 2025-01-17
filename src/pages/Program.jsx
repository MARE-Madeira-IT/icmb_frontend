import React, { useEffect, useState } from 'react'
import { Container, Content } from '../helper'
import Header from '../common/Header'
import styled from 'styled-components';
import dayjs from "dayjs";
import { fetchCalendars } from '../redux/redux-modules/calendar/actions';
import { connect } from 'react-redux';

const HeaderContent = styled.div`
    height: calc(100% - 60px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 50px;
    box-sizing: border-box;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background-color: #EFEFEF;
        border-radius: 6px;
        padding: 6px;
        box-sizing: border-box;

        button {
            border: 0px;
            padding: 6px 16px;
            box-sizing: border-box;
            cursor: pointer;
            border-radius: 6px;
            background-color: transparent;

            &:hover {
                background-color: white;
            }
        }

        .active {
            background-color: white;
            
            
            box-shadow: 0px 0px 5px 1px rgba(0,0,0,.1);
        }
    }
`;

const Filters = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: sticky;
    top: 0;
    left: 0;
    background-color: white;
    padding: 10px 0px;
    box-sizing: border-box;

    a {
        white-space: pre;
        text-align: center;
        margin: 0px;
        cursor: pointer;
        text-decoration: none;
        color: black;
        
    }

    .active {
        color: ${({ theme }) => theme.primary};
        font-weight: bold;
    }
`;

const SectionContainer = styled.section`
    margin-top: 20px;
`;

const Section = styled.div`
    padding-top: 50px;
    margin-top: -50px;
    margin-bottom: 20px;

    .content {
        padding: 20px 0px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-top: 1px solid #E1E1E1;
        border-bottom: 1px solid #E1E1E1;

        .datetime {
            padding: 0px 20px;
            box-sizing: border-box;
            border-right: 1px solid #E1E1E1;
            opacity: .8;

            p {
                margin: 0px;
                font-size: 14px;
            }
        }

        .info {
            padding: 0px 20px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex: 1;

            button {
                cursor: pointer;
                background-color: transparent;
                border: 0px;
                box-shadow: 0px;

                img {
                    width: 25px;
                    height: 25px;
                }
            }

            .title {
                h3, p {
                    margin: 0px;
                }

                h3 {
                    font-size: 16px;
                }
            }

            
        }
    }
`;


function Program(props) {
    const { data } = props;
    const [myProgram, setMyProgram] = useState(0)
    const [filters, setFilters] = useState(["2025-10-07", "2025-10-08", "2025-10-09"])
    const [currentFilter, setCurrentFilter] = useState(0)

    useEffect(() => {
        const onScroll = e => {
            filters.forEach(filter => {
                if (elementInViewport(document.getElementById(filter))) {
                    setCurrentFilter(filters.indexOf(filter));
                }
            });
        };

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };

    }, [])

    useEffect(() => {
        props.fetchCalendars()

    }, [])

    useEffect(() => {
        Object.entries(data).map((section, index) => {
            console.log(section)
        });
    }, [data])




    const elementInViewport = (el) => {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top >= window.pageYOffset &&
            left >= window.pageXOffset &&
            (top + height) <= (window.pageYOffset + window.innerHeight) &&
            (left + width) <= (window.pageXOffset + window.innerWidth)
        );
    }

    const handleScroll = (el, scroll_id) => {
        if (elementInViewport(el) && scroll_id) {
            setCurrentFilter(filters.indexOf(scroll_id));
        }

    }

    const CalendarEntry = ({ entry }) => (
        <Section onScroll={(e) => handleScroll(e, entry.from)} id={entry.from}>
            <div className="content">
                <div className='datetime'>
                    <p>{dayjs(entry.date).format('MMM DD')}</p>
                    <p>{dayjs(entry.from).format('H:mm A')}</p>
                    <p>{dayjs(entry.to).format('H:mm A')}</p>
                </div>
                <div className='info'>
                    <div className='title'>
                        <h3>{entry.title}</h3>
                        <p>{entry.room}</p>
                    </div>
                    <button>
                        <img src={entry.my_schedule ? "/icons/program_schedule.svg" : "/icons/program_add.svg"} alt="" />
                    </button>
                </div>

            </div>
        </Section>
    )



    return (
        <Container>
            <Header hasback hasprofile background="/images/default_header.jpg">
                <HeaderContent>
                    <div>
                        <button onClick={() => setMyProgram(0)} className={myProgram ? "" : "active"}>Full schedule</button>
                        <button onClick={() => setMyProgram(1)} className={myProgram ? "active" : ""}>My schedule</button>
                    </div>
                </HeaderContent>


            </Header>
            <Content>

                <Filters>
                    {filters.map((filter, index) => (
                        <a key={index} href={"/program#" + filter} onClick={() => setCurrentFilter(index)} className={index == currentFilter ? 'active' : ''}>
                            {dayjs(filter).format('ddd[\n]MMM DD')}
                        </a>
                    ))}
                </Filters>

                <SectionContainer>


                    {Object.entries(data).map((section, index) => (
                        <div key={"section_" + index}>
                            {filters[currentFilter] == dayjs(section[0]).format("YYYY-MM-DD") &&
                                <div>
                                    {myProgram == 0 && <h4 style={{ fontWeight: "400" }}>{dayjs(section[0]).format('HH:mm A')}</h4>}
                                    {(myProgram == 1 && section[1].some((centry) => centry.my_schedule == 1)) && <h4 style={{ fontWeight: "400" }}>{dayjs(section[0]).format('HH:mm A')}</h4>}
                                    {
                                        section[1].map((entry, i) => (
                                            <div key={entry.id}>
                                                {myProgram == 0 ?
                                                    <CalendarEntry entry={entry} />
                                                    : (myProgram == 1 && entry.my_schedule) &&
                                                    <CalendarEntry entry={entry} />
                                                }
                                            </div>
                                        ))}
                                </div>
                            }
                        </div >
                    ))}
                </SectionContainer>
            </Content>
        </Container >
    )
}

// {(myProgram == 0 || section.my_schedule == 1) &&
//     <Section onScroll={(e) => handleScroll(e, section.scroll_id)} id={section.scroll_id}>
//         {section.scroll_id && <h3>{section.scroll_id}</h3>}
//         {/* <p>{section.from}</p> */}

//         <div className="content">
//             <div className='datetime'>
//                 <p>{dayjs(section[0]).format('MMM DD')}</p>
//                 <p>{section.from}</p>
//                 <p>{section.to}</p>
//             </div>
//             <div className='info'>
//                 <div className='title'>
//                     <h3>{section.title}</h3>
//                     <p>{section.room}</p>
//                 </div>
//                 <button>
//                     <img src={section.my_schedule ? "/icons/program_schedule.svg" : "/icons/program_add.svg"} alt="" />
//                 </button>
//             </div>

//         </div>
//     </Section>
// }

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCalendars: (filters) => dispatch(fetchCalendars(filters)),
    };
};

const mapStateToProps = (state) => {
    return {

        data: state.calendar.data,
        loading: state.calendar.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Program);