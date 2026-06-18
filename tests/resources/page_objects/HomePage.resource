*** Settings ***
Resource    ../common_keywords.resource

*** Variables ***
${HOME_PATH}    /pages/home/home.html
${DEFAULT_BASE_URL}    http://127.0.0.1:5173

*** Keywords ***
Go To Home Page
    [Arguments]    ${base_url}=${DEFAULT_BASE_URL}
    ${url}=    Set Variable    ${base_url}${HOME_PATH}
    Open Application    ${url}

Search Tours    [Arguments]    ${query}    ${location}=${EMPTY}    ${price}=${EMPTY}
    Input Text    id=tour-search-input    ${query}
    Run Keyword If    '${location}' != ''    Select From List By Value    id=search-location    ${location}
    Run Keyword If    '${price}' != ''       Select From List By Value    id=search-price       ${price}
    Click Element    id=btn-search-submit
    Wait Until Element Is Visible    id=featured-tours-grid    timeout=5s
