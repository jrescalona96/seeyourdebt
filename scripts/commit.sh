#commit, merge, push changes from dev
cd ../
clear
git add .
git commit $1
echo "commited with ==> " $1
git checkout master
git merge dev
echo "merged changes"
git push
echo "pushed changes"
git checkout dev
cd scripts
