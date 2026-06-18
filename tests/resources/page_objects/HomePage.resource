*** Settings ***
Resource    ../common_keywords.resource

*** Variables ***
${HOME_PATH}    /pages/home/home.html
${DEFAULT_BASE_URL}    http://127.0.0.1:3001

*** Keywords ***
Go To Home Page
    [Arguments]    ${base_url}=${DEFAULT_BASE_URL}
    ${url}=    Set Variable    ${base_url}${HOME_PATH}
    Open Application    ${url}
    Wait Until Element Is Visible    id=btn-hero-explore    timeout=10s
    Wait Until Element Is Visible    id=tour-search-input    timeout=10s

Search Tours    [Arguments]    ${query}    ${location}=${EMPTY}    ${price}=${EMPTY}
    Wait Until Element Is Visible    id=tour-search-input    timeout=10s
    Input Text    id=tour-search-input    ${query}
    Run Keyword If    '${location}' != ''    Select From List By Value    id=search-location    ${location}
    Run Keyword If    '${price}' != ''       Select From List By Value    id=search-price       ${price}
    Scroll Element Into View    id=btn-search-submit
    Click Element    id=btn-search-submit
    Wait Until Location Contains    /tours    timeout=10s
    Wait Until Element Is Visible    id=tours-grid-container    timeout=10s
