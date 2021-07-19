# Check if user is running sudo or root
if [ "$EUID" -ne 0 ]
  then echo "Please run as root or sudo"
  exit
fi

# Check if version is correct
VERSION=$(grep -oP '(?<=^VERSION_CODENAME=).+' /etc/os-release | tr -d '"')
if [ $VERSION != "focal" ]
  then echo "This script only works in Ubuntu 20.04 (Focal)"
  exit
fi
# Install necessary tools (non custom repos)
apt update
apt install curl wget grep gcc make -y

# Install nginx custom repo
nginx=stable
add-apt-repository ppa:nginx/$nginx
apt update

# Add PHP ppa by ondrej
add-apt-repository ppa:ondrej/php -y
apt update

# Install Node.JS Repo
curl -fsSL https://deb.nodesource.com/setup_14.x | -E bash -

# Install Node.JS, Nginx (it's pronounced Engine-X btw) and PHP 8
apt update
apt install nginx nodejs php8.0
