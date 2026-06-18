*** Settings ***
Resource    ../common_keywords.resource

*** Variables ***
${LOGIN_PATH}    /pages/auth/login/login.html
${DEFAULT_BASE_URL}    http://127.0.0.1:5173

*** Keywords ***
Go To Login Page
    [Arguments]    ${base_url}=${DEFAULT_BASE_URL}
    ${url}=    Set Variable    ${base_url}${LOGIN_PATH}
    Open Application    ${url}

Login With Credentials    [Arguments]    ${email}    ${password}
    Input Text    id=email-input    ${email}
    Input Text    id=password-input    ${password}
    Click Element    id=btn-login
    Wait Until Element Is Visible    id=navbar    timeout=5s