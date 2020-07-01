#commit, merge, push changes from dev
git checkout master && git merge dev
git add . && git commit -m $1 && echo "commited with ==> " $1
echo "merged changes"
git push
echo "pushed changes"
git checkout dev
cd scripts
