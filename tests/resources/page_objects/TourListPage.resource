*** Settings ***
Resource    ../common_keywords.resource

*** Variables ***
${TOURS_PATH}    /pages/tours/tour_list/tour_list.html
${DEFAULT_BASE_URL}    http://127.0.0.1:3001

*** Keywords ***
Go To Tours List
    [Arguments]    ${base_url}=${DEFAULT_BASE_URL}
    ${url}=    Set Variable    ${base_url}${TOURS_PATH}
    Open Application    ${url}

Apply Filters    [Arguments]    ${location}=${EMPTY}    ${price}=${EMPTY}    ${rating}=${EMPTY}
    ${location}    Run Keyword If    '${location}' != ''    Select From List By Value    id=filter-location    ${location}
    ${price}       Run Keyword If    '${price}' != ''       Select From List By Value    id=filter-price       ${price}
    ${rating}      Run Keyword If    '${rating}' != ''      Select From List By Value    id=filter-rating      ${rating}
    Wait Until Element Is Visible    id=btn-apply-filters    timeout=10s
    Scroll Element Into View    id=btn-apply-filters
    Execute JavaScript    document.getElementById('btn-apply-filters').click();
    Wait Until Element Is Visible    id=tours-grid-container    timeout=10s
