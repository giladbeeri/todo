start /affinity 0xaa cmd /c "jasmine-node ..\server --autotest --watch ..\..\ --captureExceptions --color --verbose"
wmic process where name="node.exe" CALL setpriority "idle"
