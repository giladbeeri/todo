; Depracted since the move to mocha (from jasmine-node). use "make test-w".
start /affinity 0xaa cmd /c "mocha ..\server --autotest --watch ..\..\ --captureExceptions --color --verbose --check-leaks --slow 75"
wmic process where name="node.exe" CALL setpriority "idle"
