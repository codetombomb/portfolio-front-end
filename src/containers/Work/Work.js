import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function Work({ project }) {
  console.log(project);
  return (
    <div className="Work">
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={`./worksImgs/${project.img_name}.png`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="small" href={project.github_link}>Learn More</Button>
        </CardActions>
      </CardActionArea>
    </Card>
    </div>
  );
}
export default Work;
