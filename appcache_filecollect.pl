#!/opt/local/bin/perl
$STARTDIR = "/latex/habil";
$STARTDIR = "/Users/niehaus/ownCloudLD/Atom/DisApp/docs";
$APPURL = "http://niebert.github.io/DisApp";
#@FILE_MATCH = ('\.gif','\.GIF');
#@FILE_MATCH = ('\.pcx','\.PCX');
#@FILE_MATCH = ('\.html','\.htm');
#@FILE_MATCH = ();
@FILE_EXCLUDE = ('\.doc','\.docx','\.odt','\.appcache','\.DS_Store');
@DIR_EXCLUDE = ("search_data","x_niehaus");
$RELATIVEURL = "1";
###################################################################

#################################################
# handle Match File in non exclude directory 	#
#################################################

sub handle_file {
	my $vINPUTfile = $_[0];
	print "MATCH $vINPUTfile\n";
	# $vINPUTfile =~ s/\//\\/g;
	# //$vINPUTfile = lc($vINPUTfile);
	$vOUTPUTfile = $vINPUTfile;
	my $find = $STARTDIR;
	my $replace = $APPURL;
	$find = quotemeta $find; # escape regex metachars if present
	if ($RELATIVEURL == "1") {
		$vOUTPUTfile =~ s/$find\///g;
	} else {
		$vOUTPUTfile =~ s/$find/$replace/g;
	};
	# $vOUTPUTfile =~ s/\.pcx$/\.pdf/g;
	# $vHELPfile = $vINPUTfile;
	# $vHELPfile =~ s/\.pcx$/temp\.jpg/g;
	#$vINPUTfile =~ s/\.pcx$/\.eps/g;
	#$vOUTPUTfile =~ s/\.pcx$/\.eps/g;
	#$vOUTPUTfile =~ s/\.gif$/\.eps/g;
	#### LOAD FILE ###############
	#print OUTFILE "CONVERT $vINPUTfile $vOUTPUTfile\n";	
	print OUTFILE "$vOUTPUTfile\n";	
	#print OUTFILE "CONVERT $vHELPfile $vOUTPUTfile\n";	
	#print OUTFILE "DEL $vHELPfile \n";	
};



###################################################################
###################################################################
###################################################################
print "Starting Searching in $STARTDIR ...\n";
open (OUTFILE,">docs/disapp.appcache");
#print OUTFILE "$fileline \n";
print OUTFILE "CACHE MANIFEST\n";
print OUTFILE "\n";
print OUTFILE "# Time: ".&getGenerateTime()."\n";
print OUTFILE "\n";
print OUTFILE "CACHE:\n";

&search($STARTDIR);

print OUTFILE "\n";
print OUTFILE "NETWORK:\n";
print OUTFILE " * \n";
close (OUTFILE);
print "Searching finished.\n";

sub search {
  my $dir = $_[0];
  # &search_match($dir);
  &search_exclude($dir);
};

sub search_exclude {
  my $dir = $_[0];
  my $file;

  print "DIR   ",$dir,"\n";

  chdir $dir or (warn "Cannot chdir $dir: $!");
  opendir(DIR, $dir) or (warn "Cannot open $dir: $!");
  my @contents = readdir DIR;
  closedir(DIR);

  my $fileIsMatching = 0;
  my $dirIsMatching = 0;
  foreach my $f (@contents) {
  	$content = $dir."/".$f;
  	########### FILE ######################
	if (-f "$content") {
		$file = $content;
		#print "$file\n";
		$fileIsMatching = 0;
		foreach my $regexp (@FILE_EXCLUDE) {
			### "$" in Regular Expression determines End of String "myfile.txts" would not match "\.txt$"
    	  	if ($file =~ m/$regexp$/) {
    	  		$fileIsMatching++;
    	  	};
   		};
		if ($fileIsMatching == 0) {
    		&handle_file($file);
    	} else {
    	   	print "MATCH-X $file excluded form search\n";
    	};
    } else {
    ########### DIRECTORY ##################
    	$directory = $content;
    	$directory =~ s/\/[\/]+/\//g;
    	if (($f ne ".") and ($f ne "..")) {
    		$dirIsMatching = 0;
 			foreach my $regexp (@DIR_EXCLUDE) {
				### "$" in Regular Expression determines End of String "myfile.txts" would not match "\.txt$"
    	  		if ($directory =~ m/$regexp$/) {
    	  			$dirIsMatching++;
    	   			print "DIR-X $directory match for $regexp \n";    	  			
    	  		};
    	  	};
    		if ($dirIsMatching > 0) {
    	   		print "DIR-X $directory excluded form search\n";
    	   	} else {
     			&search($directory);
     		}
     	};
	}
  }
}


sub search_match {
  my $dir = $_[0];
  my $file;

  print "DIR   ",$dir,"\n";

  chdir $dir or (warn "Cannot chdir $dir: $!");
  opendir(DIR, $dir) or (warn "Cannot open $dir: $!");
  my @contents = readdir DIR;
  closedir(DIR);

  my $fileIsMatching = 0;
  my $dirIsMatching = 0;
  foreach my $f (@contents) {
  	$content = $dir."/".$f;
  	########### FILE ######################
	if (-f "$content") {
		$file = $content;
		#print "$file\n";
		$fileIsMatching = 0;
		foreach my $regexp (@FILE_MATCH) {
			### "$" in Regular Expression determines End of String "myfile.txts" would not match "\.txt$"
    	  	if ($file =~ m/$regexp$/) {
    	  		$fileIsMatching++;
    	  	};
   		}
		if ($fileIsMatching > 0) {
    		&handle_file($file);
    	} else {
    	   	print "MATCH-X $file excluded form search\n";
    	};
    } else {
    ########### DIRECTORY ##################
    	$directory = $content;
    	$directory =~ s/\/[\/]+/\//g;
    	if (($f ne ".") and ($f ne "..")) {
    		$dirIsMatching = 0;
 			foreach my $regexp (@DIR_EXCLUDE) {
				### "$" in Regular Expression determines End of String "myfile.txts" would not match "\.txt$"
    	  		if ($directory =~ m/$regexp$/) {
    	  			$dirIsMatching++;
    	  		};
    	  	};
    		if ($dirIsMatching > 0) {
    	   		print "DIR-X $directory excluded form search\n";
    	   	} else {
     			&search($directory);
     		}
     	};
	}
  }
}

sub getGenerateTime {

    my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst)=localtime(time);
    my $nice_timestamp = sprintf ( "%04d/%02d/%02d %02d:%02d:%02d",
                                   $year+1900,$mon+1,$mday,$hour,$min,$sec);
    return $nice_timestamp;
}

sub X_getGenerateTime {
	@months = qw( Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec );
	@days = qw(Sun Mon Tue Wed Thu Fri Sat Sun);
	$year += 1900;
	$mon += 1;
	($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime();
	return "$year/$mon/$mday  $hour:$min:$sec";
	#return "$days[$wday] $mday. $months[$mon] $year - $hour:$min:$se";
}