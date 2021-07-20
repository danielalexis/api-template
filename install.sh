# Check if user is running sudo or root
if [ "$(id -u)" != '0' ]; then
    echo 'Error: this script can only be executed by root'
    exit
fi

apt-get update > /dev/null
apt install lsb-release

release="$(lsb_release -s -r)"
codename="$(lsb_release -s -c)"

if [ "$release" != '20.04' ]; then
    echo 'Error: this script can only be executed on a Ubuntu 20.04'
    exit
fi

if [ "$codename" != 'focal' ]; then
    echo 'Error: this script can only be executed on a Ubuntu Focal'
    exit
fi

#BRANCH=release # for latest release
#BRANCH=beta   # for beta release
BRANCH=main   # for latest code

echo "Branch/ReleaseChannel selected:" $BRANCH
# Install necessary tools (non custom repos)
apt update > /dev/null
apt install curl wget grep gcc make -y > /dev/null

# Install nginx custom repo
nginx=stable
add-apt-repository ppa:nginx/$nginx > /dev/null
apt update > /dev/null

# Add PHP ppa by ondrej
add-apt-repository ppa:ondrej/php -y > /dev/null
apt update > /dev/null

# Install Node.JS Repo
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash - > /dev/null

# Install Node.JS, Nginx (it's pronounced Engine-X btw) and PHP 8
apt update > /dev/null
apt install nginx nodejs php8.0  -y > /dev/null


# Make all folders
mkdir -p /var/equilibrium/ssl/
mkdir -p /var/equilibrium/data/
mkdir -p /var/equilibrium/api/
mkdir -p /var/equilibrium/web/