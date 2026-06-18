*** Settings ***
Resource    ../common_keywords.resource

*** Variables ***
${PROFILE_PATH}    /pages/profile/profile.html
${DEFAULT_BASE_URL}    http://127.0.0.1:3001

*** Keywords ***
Go To Profile Page
    [Arguments]    ${base_url}=${DEFAULT_BASE_URL}
    ${url}=    Set Variable    ${base_url}${PROFILE_PATH}
    Go To    ${url}
    Wait Until Location Contains    /profile    timeout=15s
    Wait Until Element Is Visible    id=profile-fullname-input    timeout=15s
    Wait Until Element Is Visible    id=profile-update-btn    timeout=15s

Update Profile Name    [Arguments]    ${new_name}
    Wait Until Element Is Visible    id=profile-fullname-input    timeout=15s
    Input Text    id=profile-fullname-input    ${new_name}
    Wait Until Element Is Visible    id=profile-update-btn    timeout=15s
    Scroll Element Into View    id=profile-update-btn
    Wait Until Element Is Enabled    id=profile-update-btn    timeout=10s
    Click Element    id=profile-update-btn
    Wait Until Keyword Succeeds    1s    15s    Profile Name Should Contain    ${new_name}

Profile Name Should Be    [Arguments]    ${expected}
    Element Text Should Be    id=profile-name    ${expected}

Profile Name Should Contain    [Arguments]    ${expected}
    ${profile_text}=    Get Text    id=profile-name
    Should Contain    ${profile_text}    ${expected}
