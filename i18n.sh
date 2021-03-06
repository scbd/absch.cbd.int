#!/bin/bash

echo "i18n.sh"
####
# Helper script to update the Last modified timestamp of files in a Git SCM
# Projects working Copy
#
# When you clone a Git repository, it sets the timestamp of all the files to the
# time when you cloned the repository.
#
# This becomes a problem when you want the cloned repository, which is part of a 
# Web application have a proper cacheing mechanism so that it can re-cache files
# (into a webtree) that have been modified since the last cache.
#
# @see http://stackoverflow.com/questions/1964470/whats-the-equivalent-of-use-commit-times-for-git
#
# Author: Jeffery Fernandez <jeffery@fernandez.net.au>
####

# Make sure we are not running this on a bare Repository
REPO_TYPE=`git config --list|egrep ^core.bare | awk -F '=' '{ print $2 }'`
if [ "$REPO_TYPE" == "true" ]
then
	echo "Cannot run this script on a bare Repository" && exit 1
fi

echo "Updating Git Repository Last Modified Time-stamp"

# Obtain the Operating System
OS=${OS:-`uname`}

# Get the last revision hash of a particular file in the git repository
getFileLastRevision() 
{
	git rev-list HEAD "$1" | head -n 1
}

# Extract the actual last modified timestamp of the file and Update the time-stamp
updateFileTimeStamp() 
{

	allowedFiles="\.(js|html|css|json)$"
	if [[ $1 =~ $allowedFiles ]]; then 

		# # Extract the file revision
		# FILE_REVISION_HASH=`getFileLastRevision "$1"`

		# # Get the File last modified time
		# FILE_MODIFIED_TIME=`git show --pretty=format:%at --abbrev-commit ${FILE_REVISION_HASH} | head -n 1`
		# FILE_MODIFIED_DATE=`git show --pretty=format:%ai --abbrev-commit ${FILE_REVISION_HASH} | head -n 1`
		FILE_MODIFIED_TIME=$2
		# Extract the last modified timestamp, differently for Linux, FreeBSD and Mac OS X
		if [ "$OS" = 'Linux' ]
		then			
			# Format dat for use in touch
			NEWFORMAT=`date -d @"${FILE_MODIFIED_TIME}" +'%Y%m%d%H%M.%S'`
			# for displaying the date in readable format			
			#	# FORMATTED_TIMESTAMP=`date --date="${FILE_MODIFIED_TIME}" +'%d-%m-%Y %H:%M:%S %z'`
			# echo "Modified: ${NEWFORMAT} | ${FILE_MODIFIED_DATE} > ${1}" 		
			# Modify the last modified timestamp
			touch -t "${NEWFORMAT}" $1
		
		elif [ "$OS" = 'Darwin' ] || [ "$OS" = 'FreeBSD' ]
		then
			# Format the date for updating the timestamp
			FORMATTED_TIMESTAMP=`date -j -f '%Y-%m-%d %H:%M:%S %z' "${FILE_MODIFIED_TIME}" +'%Y%m%d%H%M.%S'`
			#echo "Modified: ${FILE_MODIFIED_TIME} | ${FORMATTED_TIMESTAMP} > ${1}"
			echo "other > ${2}"
			# Modify the last modified timestamp
			touch -d  "${FORMATTED_TIMESTAMP}" $1
		else
			echo "Unknown Operating System to perform timestamp update" >&2
			exit 1
		fi

	fi
}

# Backup and update the "Internal Field Separator" to a newline. This is so that
# we can deal with spaces in file names in the for loop below
IFS_BAK=$IFS
IFS="
"
declare -A fileRevision
# Loop through and fix timestamps on all files in our checked-out repository
echo 'Reading last modified date'
for file in $(git ls-files)
do
	minifyRegex="\.(js|html|css)$"
	ignorePaths="^(\/app\/server\.js|\/app\/middlewares|\/app\/scripts|node_modules)"
	if [[ ${file} =~ $minifyRegex ]]; then 
		if [[ ! ${file} =~ $ignorePaths ]]; then
			
			# updateFileTimeStamp "${file}" "${file}"
			# Extract the file revision
			FILE_REVISION_HASH=`getFileLastRevision "${file}"`

			# Get the File last modified time
			FILE_MODIFIED_TIME=`git show --pretty=format:%at --abbrev-commit ${FILE_REVISION_HASH} | head -n 1`
			
			# echo "${file}" "$FILE_MODIFIED_TIME"

			fileRevision[${file}]=$FILE_MODIFIED_TIME

		fi
	fi
	
done

echo 'Finish read lat modified date'
currentDir="$(pwd)"
echo "Starting minification " "$currentDir"
node /usr/src/app/scripts/process-files  "$currentDir"
echo "Current dir: $currentDir"

for k in "${!fileRevision[@]}"
do
    # echo "$k" "${fileRevision[$k]}"
	updateFileTimeStamp "$k" "${fileRevision[$k]}"
done

# Revert the default delimiter
IFS=$IFS_BAK
IFS_BAK=