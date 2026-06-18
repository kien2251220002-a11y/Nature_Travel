*** Settings ***
Documentation     Profile tests for NatureTravel (POM style)
Resource          ../resources/page_objects/LoginPage.resource
Resource          ../resources/page_objects/ProfilePage.resource
Suite Teardown    Close Application
Test Teardown     Capture Screenshot For Test    profile

*** Variables ***
${BASE_URL}    http://127.0.0.1:3001
${TEST_USER_EMAIL}    Kcao360@gmail.com
${TEST_USER_PASSWORD}    caokien

*** Test Cases ***
Profile Page Loads
    [Documentation]    Log in and verify profile page loads with name display.
    Go To Login Page    ${BASE_URL}
    Login With Credentials    ${TEST_USER_EMAIL}    ${TEST_USER_PASSWORD}
    Go To Profile Page    ${BASE_URL}
    Wait Until Element Is Visible    id=profile-name    timeout=5s

Update Profile Display Name
    [Documentation]    Logs in and updates the profile display name, then verifies it updated.
    Go To Login Page    ${BASE_URL}
    Login With Credentials    ${TEST_USER_EMAIL}    ${TEST_USER_PASSWORD}
    Go To Profile Page    ${BASE_URL}
    ${rnd}=    Generate Random Number
    ${new_name}=    Set Variable    Test User ${rnd}
    Update Profile Name    ${new_name}
    Profile Name Should Be    ${new_name}

Profile Name Persists
    [Documentation]    Update profile name and verify it persists on page reload.
    Go To Login Page    ${BASE_URL}
    Login With Credentials    ${TEST_USER_EMAIL}    ${TEST_USER_PASSWORD}
    Go To Profile Page    ${BASE_URL}
    ${rnd}=    Generate Random Number
    ${new_name}=    Set Variable    Updated User ${rnd}
    Update Profile Name    ${new_name}
    Wait Until Element Is Visible    id=profile-name    timeout=5s

Multiple Profile Updates
    [Documentation]    Update profile name multiple times.
    Go To Login Page    ${BASE_URL}
    Login With Credentials    ${TEST_USER_EMAIL}    ${TEST_USER_PASSWORD}
    Go To Profile Page    ${BASE_URL}
    ${rnd}=    Generate Random Number
    Update Profile Name    First Update ${rnd}
    Sleep    1s
    Update Profile Name    Second Update ${rnd}
    Wait Until Element Is Visible    id=profile-name    timeout=5s

Profile Update With Empty Name
    [Documentation]    Attempt to update profile with empty name.
    Go To Login Page    ${BASE_URL}
    Login With Credentials    ${TEST_USER_EMAIL}    ${TEST_USER_PASSWORD}
    Go To Profile Page    ${BASE_URL}
    Input Text    id=profile-fullname-input    ${EMPTY}
    Click Element    id=profile-update-btn
    Wait Until Element Is Visible    id=toast-notification    timeout=5s

*** Keywords ***
Generate Random Number
    ${rand}=    Evaluate    str(int(random()*1000))    modules=random
    RETURN    ${rand}