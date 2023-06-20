# Corporate Chat

## Requirements

* NodeJs v18.16.0
* Apache 2.4
* PHP 7.3
* MySQL 5.7
* Composer

## Installation

In this instruction we will use OpenServer LAMP build.

For the first install OpenServer. Configure it setting proper modules versions
from Requirements section above.

In the Domains tab of OpenServer settings select any autosearch pattern
which includes `web` variant. *Domains Management* select `Autosearch` or `Manual+Autosearch`.

Save and restart server.

Next step you should add path to your PHP executable into the `%PATH%` environment variable.
`php` should be available from command prompt.

Next step make sure you have Composer installed. If not install it.

Open `domains` directory in your Open Server installation path.
Create two folders in it, one for the frontend and one for the backend parts of the project.

For example, you can call it `chat.loc` and `api.chat.loc`.

Put your backend files into the folder you've created for it.
Open this folder and run command prompt in it.
Run `composer install` command and wait for necessary modules to install.

Create new database in your MySQL instance. No matter how to name it, for example you can name it `chat`.
Open `config/db.php` file with your preferred code editor.
Put your DB name into the `dsn` parameters. (`mysql:host=localhost;dbname=YOUR_DATABASE_NAME_HERE`)

Run `php ./yii migrate` command from console and wait for DB migrations applied.

Backend is ready! Now let's configure frontend.

Place frontend files wherever you like.
Open `src/main.js` file with your preferred editor.
Set `Axios.defaults.baseURL` param to match your current backend URL.
Open command prompt in this folder and run `npm run build`.

Wait for build to finish. Resulting files will be stored in the `dist` folder.

Move these files to the folder in the Open Server `domains` directory you've created for the frontend.

Now you can open your frontend URL and it should work! Good Luck!
