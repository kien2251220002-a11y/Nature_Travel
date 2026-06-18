*** Settings ***
Resource    ../common_keywords.resource

*** Variables ***
${REGISTER_PATH}    /pages/auth/register/register.html
${DEFAULT_BASE_URL}    http://127.0.0.1:5173

*** Keywords ***
Go To Register Page
    [Arguments]    ${base_url}=${DEFAULT_BASE_URL}
    ${url}=    Set Variable    ${base_url}${REGISTER_PATH}
    Open Application    ${url}

Register New User    [Arguments]    ${fullname}    ${email}    ${phone}    ${password}
    Input Text    id=full-name-input    ${fullname}
    Input Text    id=email-input    ${email}
    Input Text    id=phone-input    ${phone}
    Input Text    id=password-input    ${password}
    Input Text    id=confirm-password-input    ${password}
    Click Element    id=terms-checkbox
    Click Element    id=btn-register
    Wait Until Element Is Visible    id=navbar    timeout=5s
