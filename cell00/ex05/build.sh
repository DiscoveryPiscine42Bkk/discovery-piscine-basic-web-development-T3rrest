if [ -z "$1" ]
  then
    echo "No argument supplied"
else
  for i in $*
  do
	  mkdir ex$i
  done
fi