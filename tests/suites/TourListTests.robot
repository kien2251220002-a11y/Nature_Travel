*** Settings ***
Documentation    Tour list tests (POM)
Resource         ../resources/page_objects/TourListPage.resource
Suite Teardown   Close Application
Test Teardown    Capture Screenshot For Test    tour_list

*** Variables ***
${BASE_URL}    http://127.0.0.1:3001

*** Test Cases ***
Tour List Page Loads
	[Documentation]    Open tour list page and verify the tours grid is visible.
	Go To Tours List    ${BASE_URL}
	Wait Until Element Is Visible    id=tours-grid-container    timeout=5s

Apply Filters Shows Results
	[Documentation]    Open tours list, apply filters and verify grid updates.
	Go To Tours List    ${BASE_URL}
	Apply Filters    Quảng Ninh    2500000    4.6
	Wait Until Element Is Visible    id=tours-grid-container    timeout=5s

Filter Tours Data Driven
	[Template]    Filter Tour Example
	Quảng Ninh    1500000    4.6
	Lào Cai    4000000    4.7
	Ninh Bình    6000000    4.6

Apply Location Filter Only
	[Documentation]    Apply only location filter and verify results.
	Go To Tours List    ${BASE_URL}
	Apply Filters    Quảng Ninh
	Wait Until Element Is Visible    id=tours-grid-container    timeout=5s

Apply Price Filter Only
	[Documentation]    Apply only price filter and verify results.
	Go To Tours List    ${BASE_URL}
	Apply Filters    ${EMPTY}    2500000
	Wait Until Element Is Visible    id=tours-grid-container    timeout=5s

*** Keywords ***
Filter Tour Example
	[Arguments]    ${location}    ${price}    ${rating}
	Go To Tours List    ${BASE_URL}
	Apply Filters    ${location}    ${price}    ${rating}
	Wait Until Element Is Visible    id=tours-grid-container    timeout=5s
