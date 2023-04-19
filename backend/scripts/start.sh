#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset
set -o xtrace

python manage.py migrate
# { # try
#     python manage.py loaddata constants.json
#     echo "loaddata succeeded"
# } || { # catch
#     echo "loaddata failed!"
# }
python manage.py collectstatic --noinput --verbosity 0

python manage.py runserver_plus 0.0.0.0:8000
