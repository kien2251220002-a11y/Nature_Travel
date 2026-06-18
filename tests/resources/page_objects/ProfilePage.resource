*** Settings ***
Resource    ../common_keywords.resource

*** Variables ***
${PROFILE_PATH}    /pages/profile/profile.html
${DEFAULT_BASE_URL}    http://127.0.0.1:3001

*** Keywords ***
Go To Profile Page
    [Arguments]    ${base_url}=${DEFAULT_BASE_URL}
    ${url}=    Set Variable    ${base_url}${PROFILE_PATH}
    Open Application    ${url}

Update Profile Name    [Arguments]    ${new_name}
    Input Text    id=profile-fullname-input    ${new_name}
    Click Element    id=profile-update-btn
    Wait Until Element Contains    id=profile-name    ${new_name}    timeout=5s

Profile Name Should Be    [Arguments]    ${expected}
    Element Text Should Be    id=profile-name    ${expected}
